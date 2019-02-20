import React, { Component } from "react";
import PropTypes from "prop-types";
import Feed from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };
  static propTypes = {
    getFeed: PropTypes.func.isRequired,
    feed: PropTypes.array
  };
  componentDidMount() {
    const { getFeed } = this.props;
    if (!this.props.feed) {
      // 이미 생성된 feed가 없을 경우에 호출
      getFeed();
    } else {
      this.setState({
        loading: false
      });
    }
  }
  //새로운 prop을 받으면 실행되는 생성주기
  componentWillReceiveProps = nextProps => {
    if (nextProps.feed) {
      this.setState({
        loading: false
      });
    }

  };
  render() {
    const { feed } = this.props;
    return <Feed {...this.state} feed={feed} />;
  }
}

export default Container;