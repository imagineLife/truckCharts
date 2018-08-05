import React, { Component } from 'react'

export default ChartComponent => (
  class ResponsiveChart extends Component {
    constructor(props) {
      super(props)

      this.state = {
        containerWidth: null,
        containerHeight: null,
      }

      this.fitParentContainer = this.fitParentContainer.bind(this)
    }

    componentDidMount() {
      window.addEventListener('resize', this.fitParentContainer)
      this.fitParentContainer()
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.fitParentContainer)
    }

    fitParentContainer() {
      const { containerWidth} = this.state
      const currentContainerWidth = this.refs.respWrapperRef.getBoundingClientRect().width
      const currentContainerHeight = this.refs.respWrapperRef.getBoundingClientRect().height
      // console.log('Parent width: ' + this.refs.respWrapperRef.parentNode.clientHeight);

      const shouldResize = containerWidth !== currentContainerWidth

      if (shouldResize) {
        this.setState({
          containerWidth: currentContainerWidth,
          containerHeight: currentContainerHeight,
        })
      }
    }

    renderChart() {
      const parentWidth = this.state.containerWidth
      const parentHeight = this.state.containerHeight
      // if(parentHeight === 0){ this.fitParentContainer()}

      return (
        <ChartComponent {...this.props} fpc={() => this.fitParentContainer()} parentWidth={parentWidth} />
      )
    }

    render() {
      const { containerWidth } = this.state
      const shouldRenderChart = containerWidth !== null

      return (
        <div
          ref='respWrapperRef'
          className="Responsive-wrapper"
        >
          {shouldRenderChart && this.renderChart()}
        </div>
      )
    }
  }
)
