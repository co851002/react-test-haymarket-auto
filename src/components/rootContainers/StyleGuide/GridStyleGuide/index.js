import React, { Component } from 'react';
import { Col, Row } from 'presentational/Grid';

/**
 * <StyleGuide /> component.
 */
class GridStyleGuide extends Component {
  /**
   * Renders the StyleGuide component.
   *
   * @return {JSX} - rendered StyleGuide page.
   */
  render() {
    let colContentStyle = {
      position: 'relative',
      boxSizing: 'border-box',
      minHeight: '1rem',
      background: '#ea2914',
      marginBottom: '1rem',
      color: 'white',
      padding: '.5em',
      textAlign: 'center'
    };

    const colContentStretchStyle = {
      position: 'relative',
      boxSizing: 'border-box',
      height: '100%',
      background: '#ea2914',
      marginBottom: '1rem',
      color: 'white',
      padding: '.5em',
      textAlign: 'center'
    };

    const colStyleAlign = {
      position: 'relative',
      boxSizing: 'border-box',
      minHeight: '1rem',
      background: '#ea2914',
      marginBottom: '1rem',
      color: 'white',
      height: '10rem',
      paddingRight: '10px',
      paddingLeft: '10px'
    };

    return (
      <div>
        <h1>Grid System</h1>
        <h4>This is for display purposes and designed for QA against the following screen sizes.</h4>
        <h5>xs: 480px</h5>
        <h5>sm: 768px</h5>
        <h5>md: 992px</h5>
        <h5>lg: 1200px</h5>
        <h2>Responsive & Show/Hide</h2>
        <h5>Col 1: xs hide, md span 3, lg span 5.</h5>
        <h5>Col 2: xs span 6, sm hide, md span 6, lg span 6.</h5>
        <h5>Col 6 and Col 7 stay the same in all the viewports</h5>        
        <Row>
          <Col colXs = { 'hide' } colSm = { 'hide' } colMd = { 3 } colLg = { 5 } ><div style = { colContentStyle }>Col 1</div></Col>
          <Col colXs = { 6 } colSm = { 'hide' } colMd = { 6 } colLg = { 6 }><div style = { colContentStyle }>Col 2</div></Col>
          <Col colXs = { 6 } colSm = { 3 } colMd = { 3 } colLg = { 1 }><div style = { colContentStyle }>Col 3</div></Col>
          <Col colXs = { 12 } colSm = { 9 } colMd = { 6 } colLg = { 4 } ><div style = { colContentStyle }>Col 4</div></Col>
          <Col colXs = { 12 } colMd = { 6 } colLg = { 8 }><div style = { colContentStyle }>Col 5</div></Col>
          <Col colXs = { 6 }><div style = { colContentStyle }>Col 6</div></Col>
          <Col colXs = { 6 }><div style = { colContentStyle }>Col 7</div></Col>
        </Row>
        <h2>Offset</h2>
        <h5>Col 2: xsOffset 2, smOffset 0, mdOffset 10, lgOffset 5</h5>
        <Row>
          <Col xsOffset = { 11 } colXs = { 1 }><div style = { colContentStyle }>Col 1 offset 11</div></Col>
          <Col mdOffset = { 5 } colXs = { 2 }><div style = { colContentStyle }>col 2</div></Col>
          <Col xsOffset = { 9 } colXs = { 3 }><div style = { colContentStyle }>Col 3 offset 9</div></Col>
          <Col xsOffset = { 8 } colXs = { 4 }><div style = { colContentStyle }>Col 4 offset 8</div></Col>
          <Col xsOffset = { 7 } colXs = { 5 }><div style = { colContentStyle }>Col 5 offset 7 </div></Col>
          <Col xsOffset = { 4 } lgOffset = { 8 } colXs = { 4 }><div style = { colContentStyle }>Col 6 offset 6</div></Col>
        </Row>
        <h2>Auto Width</h2>
        <h5>Each row is divided equally by the amount of columns in each.</h5>
        <Row> 
          <Col autoWidth><div style = { colContentStyle }>AutoWidth</div></Col>
          <Col autoWidth><div style = { colContentStyle }>AutoWidth</div></Col>
        </Row>
        <Row> 
          <Col autoWidth><div style = { colContentStyle }>AutoWidth</div></Col>
          <Col autoWidth><div style = { colContentStyle }>AutoWidth</div></Col>
          <Col autoWidth><div style = { colContentStyle }>AutoWidth</div></Col>
        </Row>
        <Row> 
          <Col autoWidth><div style = { colContentStyle }>AutoWidth</div></Col>
          <Col autoWidth><div style = { colContentStyle }>AutoWidth</div></Col>
          <Col autoWidth><div style = { colContentStyle }>AutoWidth</div></Col>
          <Col autoWidth><div style = { colContentStyle }>AutoWidth</div></Col>
        </Row>
        <h2>Col Alignment</h2>
        <Row>
          <Col colXs = { 2 } ><div style = { colStyleAlign }>&nbsp;</div></Col>
          <Col start = 'xs' end = 'md' center = 'lg' colXs = { 2 }  ><div style = { colContentStyle }>xs start <br /> md end <br /> lg center</div></Col>
          <Col end = 'lg' colXs = { 2 }  ><div style = { colContentStyle }>end lg only</div></Col>
          <Col center = { ['sm', 'lg'] } colXs = { 2 }  ><div style = { colContentStyle }>center sm, lg</div></Col>
          <Col baseline colXs = { 2 }  ><div style = { colContentStyle }>baseline xs and up</div></Col>
          <Col stretch = 'xs' colXs = { 2 }  ><div style = { colContentStretchStyle }>Stretch on all screens</div></Col>
        </Row>
        <h2>Row Alignment</h2>
        <Row start = { ['sm', 'lg'] }>
          <Col colXs = { 4 } colSm = { 6 } ><div style = { colContentStyle }>Row start on sm, lg</div></Col>
        </Row>
        <Row center = { ['sm', 'lg'] }>
          <Col colXs = { 4 } colSm = { 6 } ><div style = { colContentStyle }>Row center on sm, lg </div></Col>
        </Row>
        <Row end = { ['sm', 'lg'] }>
          <Col colXs = { 4 } colSm = { 6 } ><div style = { colContentStyle }>Row end on sm and lg</div></Col>
        </Row>
        <Row top = { ['sm', 'lg'] }>
          <Col colXs = { 6 } ><div style = { colStyleAlign }>&nbsp;</div></Col>
          <Col colXs = { 6 } ><div style = { colContentStyle }>Row top sm, lg</div></Col>
        </Row>
        <Row middle = { ['sm', 'lg'] }>
          <Col colXs = { 6 } ><div style = { colStyleAlign }>&nbsp;</div></Col>
          <Col colXs = { 6 }  ><div style = { colContentStyle }>Row middle sm, lg</div></Col>
        </Row>
        <Row bottom = { ['sm', 'lg'] }>
          <Col colXs = { 6 } ><div style = { colStyleAlign }>&nbsp;</div></Col>
          <Col colXs = { 6 }  ><div style = { colContentStyle }>Row bottom sm, lg</div></Col>
        </Row>
        <h2>Row Distribution</h2>
        <h5>around only on sm and lg</h5>
        <h5>between only on sm and lg</h5>
        <Row around = { ['sm', 'lg'] } >
          <Col colXs = { 2 } ><div style = { colContentStyle }>Around</div></Col>
          <Col colXs = { 2 } ><div style = { colContentStyle }>Around</div></Col>
          <Col colXs = { 2 } ><div style = { colContentStyle }>Around</div></Col>
          <Col colXs = { 2 } ><div style = { colContentStyle }>Around</div></Col>
        </Row>
        <Row between = { ['sm', 'lg'] }>
          <Col colXs = { 2 } ><div style = { colContentStyle }>Between</div></Col>
          <Col colXs = { 2 } ><div style = { colContentStyle }>Between</div></Col>
          <Col colXs = { 2 } ><div style = { colContentStyle }>Between</div></Col>
        </Row>
        <h2>Reordering Cols 1-12</h2>
        <h5>col1 : xs5, sm1, md1, lg:6</h5>
        <h5>col2 : xs6, sm3, md2, lg:5</h5>
        <h5>col3 : xs4, sm2, md3, lg:4</h5>
        <h5>col4 : xs2, sm4, md4, lg:3</h5>
        <h5>col5 : xs1, sm5, md5, lg:2</h5>
        <h5>col6 : xs3, sm6, md6, lg:1</h5>
        <Row>
          <Col order = { { xs : 4, sm: 1, md: 1, lg: 6 } } colXs = { 2 } ><div style = { colContentStyle }>1</div></Col>
          <Col order = { { xs : 6, sm: 3, md: 2, lg: 5 } } colXs = { 2 } ><div style = { colContentStyle }>2</div></Col>
          <Col order = { { xs : 4, sm: 2, md: 3, lg: 4 } } colXs = { 2 } ><div style = { colContentStyle }>3</div></Col>
          <Col order = { { xs : 2, sm: 4, md: 4, lg: 3 } } colXs = { 2 } ><div style = { colContentStyle }>4</div></Col>
          <Col order = { { xs : 1, sm: 5, md: 5, lg: 2 } } colXs = { 2 } ><div style = { colContentStyle }>5</div></Col>
          <Col order = { { xs : 3, sm: 6, md: 6, lg: 1 } } colXs = { 2 } ><div style = { colContentStyle }>6</div></Col>
        </Row>
        <h2>Reordering Cols First/Last</h2>
        <h5>col1 : last on sm and lg</h5>
        <h5>col6 : first on sm and lg</h5>
        <Row>
          <Col colXs = { 2 } last = { ['sm', 'lg'] }><div style = { colContentStyle }>1</div></Col>
          <Col colXs = { 2 } ><div style = { colContentStyle }>2</div></Col>
          <Col colXs = { 2 } ><div style = { colContentStyle }>3</div></Col>
          <Col colXs = { 2 } ><div style = { colContentStyle }>4</div></Col>
          <Col colXs = { 2 } ><div style = { colContentStyle }>5</div></Col>
          <Col colXs = { 2 } first = { ['sm', 'lg'] }><div style = { colContentStyle }>6</div></Col>
        </Row>          
        <h2>Reverse Row</h2>
        <h5>Reverse on sm and lg</h5>
        <Row reverse = { ['sm', 'lg'] } >
          <Col colXs = { 2 }><div style = { colContentStyle }>1</div></Col>
          <Col colXs = { 2 } ><div style = { colContentStyle }>2</div></Col>
          <Col colXs = { 2 } ><div style = { colContentStyle }>3</div></Col>
          <Col colXs = { 2 } ><div style = { colContentStyle }>4</div></Col>
          <Col colXs = { 2 } ><div style = { colContentStyle }>5</div></Col>
          <Col colXs = { 2 } ><div style = { colContentStyle }>6</div></Col>
        </Row>
      </div>
    );
  }
}

export default GridStyleGuide;