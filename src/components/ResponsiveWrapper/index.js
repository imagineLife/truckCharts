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
      this.fitParentContainer()
      window.addEventListener('resize', this.fitParentContainer)
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.fitParentContainer)
    }

    fitParentContainer() {
      const { containerWidth} = this.state
      const currentContainerWidth = this.chartContainer.getBoundingClientRect().width
      const currentContainerHeight = this.chartContainer.getBoundingClientRect().height
      // console.log('Parent width: ' + this.refs.chartContainer.parentNode.clientHeight);

        console.log('currentContainerWidth')
        console.log(currentContainerWidth)

        console.log('currentContainerHeight')
        console.log(currentContainerHeight)

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

      console.log('render parentHeight')
      console.log(parentHeight)

      return (
        <ChartComponent {...this.props} parentWidth={parentWidth} />
      )
    }

    render() {
      const { containerWidth } = this.state
      const shouldRenderChart = containerWidth !== null

      return (
        <div
          ref={(el) => { this.chartContainer = el }}
          className="Responsive-wrapper"
        >
          {shouldRenderChart && this.renderChart()}
        </div>
      )
    }
  }
)
