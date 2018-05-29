import React, { Component } from 'react';
import { Button, Card, Col, Input, Pagination, ProgressBar, Row } from 'react-materialize';

class ChartControl extends Component {
    render() {
        return (
            <div>
                <Button>Housing Price</Button>

                <Col m={6} s={12}>
                    <Card className='blue-grey darken-1' textClassName='white-text' title='Card title' actions={[<a href='#' key='#'>This is a link</a>]}>
                    I am a very simple card.
                    </Card>
                </Col>

                <Row>
                    <Input s={12} type='select' label="Materialize Select" defaultValue='2'>
                        <option value='1'>Option 1</option>
                        <option value='2'>Option 2</option>
                        <option value='3'>Option 3</option>
                    </Input>
                </Row>

                <Row>
                    <Input name='group1' type='checkbox' value='red' label='Red' />
                    <Input name='group1' type='checkbox' value='yellow' label='Yellow' defaultValue='checked' />
                    {/* <Input name='group1' type='checkbox' value='green' label='Green' className='filled-in' defaultChecked='checked' /> */}
                    <Input name='group1' type='checkbox' value='brown' label='Brown' disabled='disabled' />
                </Row>

                <Row>
                    <Input name='on' type='date' onChange={function(e, value) {}} />
                </Row>

                <Row>
                    <Col s={12}>
                        <ProgressBar progress={70}/>
                    </Col>
                    <Col s={12}>
                        <ProgressBar />
                    </Col>
                </Row>

                <Pagination items={10} activePage={2} maxButtons={8} />
            </div>
        );
    }
}

export default ChartControl;
