import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import _ from 'lodash';
import topo from './Topo.js';
import './topology.less';

const topologyStyle = {
  position: 'absolute',
  zIndex: 1,
  width: '100vw',
  height: '90vh',
};

class Toplogy extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const renderDom = findDOMNode(this.refs.topology);
    topo.initalTopo(renderDom);

    this.props.getMockData();
  }
  shouldComponentUpdate(nextProps) {
    const { nodes, links, searchNode, level, tag } = nextProps;
    console.info(`nodes: ${_.isEqual(nodes, this.props.nodes)}`,
      `links: ${links===this.props.links}`,
      `search: ${searchNode===this.props.searchNode}`,
      `tag: ${tag===this.props.tag}`,
      `level: ${level===this.props.level}`);

    if (!_.isEqual(nextProps.nodes, this.props.nodes)) {
      setTimeout(() => {
        // topo.data({
        //   nodes: nextProps.nodes.asMutable({deep: true}),
        //   links: nextProps.links.asMutable({deep: true}),
        // })
      }, 1000);
    }
    //   this.updateNode(nodes);
    // else if (nextProps.links !== this.props.links)
    //   this.updateLink(links);
    // else if (nextProps.searchNode !== this.props.searchNode)
    //   this.searchNode(searchNode);
    // else if (nextProps.tag !== this.props.tag)
    //   this.changeTag(tag);
    // else if (nextProps.level !== this.props.level)
    //   this.changeLevel(level);

    return false;
  }

  render() {
    return <div ref="topology" style={topologyStyle}></div>;
  }
}

export default Toplogy;
