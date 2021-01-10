// @flow
import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { FlatList as FlatListRN, View } from "react-native";
import Util from "../../util";
import { Separator } from "../";
import Loading from "./Loading";
import EmptyView from "./EmptyView";
import LoadingFooter from "./LoadingFooter";
import NoInternetView from "./NoInternetView";
import NoInternetViewBottom from "./NoInternetViewBottom";
import utils from "../../util";
import appConfig from "../../config/AppConfig";

export default class FlatListWebServices extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    page: PropTypes.object.isRequired,
    renderItem: PropTypes.func.isRequired,
    keyExtractor: PropTypes.func,
    ItemSeparatorComponent: PropTypes.func,
    isFetching: PropTypes.bool.isRequired,
    isPullToRefresh: PropTypes.bool.isRequired,
    isInternetConnected: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired,
    emptyListMessage: PropTypes.string
  };

  static defaultProps = {
    keyExtractor: Util.keyExtractor,
    emptyListMessage: "No Records Found",
    ItemSeparatorComponent: () => <Separator />
  };

  state = {
    isInternetConnected: this.props.isInternetConnected
  };

  componentWillReceiveProps(nextProps) {
    // if (this.props.isInternetConnected && !nextProps.isInternetConnected) {
    //   this.state.isInternetConnected = false;
    // }
    // if (!this.props.isFetching && nextProps.isFetching) {
    //   this.state.isInternetConnected = true;
    // }
    this.state.isInternetConnected = nextProps.isInternetConnected;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state)
    );
  }

  _onRetryPress(reset = false) {
    if (this.props.isInternetConnected) {
      this.props.fetchData(reset, reset ? 0 : this.props.data.length);
    } else {
      utils.showAlertWithDelay("Oops", "Connection not found");
    }
  }

  _renderListFooter() {
    const { isInternetConnected } = this.state;

    const { data, isFetching, isPullToRefresh, page } = this.props;

    if (
      (page &&
        page.currentRecordCount &&
        page.currentRecordCount === appConfig.pagingRecordsPerPage &&
        !isInternetConnected) ||
      (isFetching && !isPullToRefresh)
    ) {
      return (
        <View style={{ flex: 1, height: 80 }}>
          {page &&
          page.currentRecordCount &&
          page.currentRecordCount === appConfig.pagingRecordsPerPage &&
          !isInternetConnected ? (
            <NoInternetViewBottom onRetryPress={() => this._onRetryPress()} />
          ) : null}

          {isFetching && !isPullToRefresh ? <LoadingFooter /> : null}
        </View>
      );
    }

    return null;
  }

  _onEndReach = () => {
    const {
      isFetching,
      isInternetConnected,
      data,
      page,
      fetchData
    } = this.props;
    if (
      !isFetching &&
      isInternetConnected &&
      page &&
      data &&
      page.currentRecordCount &&
      page.currentRecordCount === appConfig.pagingRecordsPerPage
    ) {
      fetchData(false, data.length);
    }
  };

  render() {
    const { isInternetConnected } = this.state;

    const { isFetching, isPullToRefresh, data, fetchData } = this.props;
    const { renderHeader, ...rest } = this.props;

    if (isFetching && !data.length) {
      return <Loading />;
    }

    if (!isInternetConnected && !data.length) {
      return <NoInternetView onRetryPress={() => this._onRetryPress(true)} />;
    }

    // if (!isFetching && !data.length) {
    //   return <EmptyView emptyListMessage={this.props.emptyListMessage} />;
    // }

    return (
      <FlatListRN
        onEndReachedThreshold={0.7}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={() => (
          <EmptyView emptyListMessage={this.props.emptyListMessage} />
        )}
        refreshing={isPullToRefresh}
        onRefresh={() => fetchData(true)}
        onEndReached={this._onEndReach}
        ListFooterComponent={() => this._renderListFooter()}
        {...rest}
      />
    );
  }
}
