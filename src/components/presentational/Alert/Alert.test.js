import React from 'react';
import Alert from './index';
import Icon from 'presentational/Icon';
import Button from 'presentational/Button';
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';
import { CSSTransitionGroup } from 'react-transition-group';
import style from 'components/Alert.scss';
import { 
  defaultDanger, 
  defaultInfo, 
  defaultSuccess, 
  defaultWarning 
} from 'variables/messages';

/**
* Test for <Col/> presentational component.
* @test {Col}
*/
describe('<Alert />', () => {

  const props = {
    message: 'hello',
    dismissable: false
  };

  it('should render the message when message prop is set.', () => {
    const wrapper = mount(
      <Alert { ...props } />
    );

    expect(wrapper.find('div').text()).to.equal(props.message);
  });

  it('should render an <icon> compoennt when dissmisable prop it set', () => {
    const wrapper = shallow(
      <Alert dismissable message = { props.message } />
    );

    expect(wrapper.find(Icon)).to.have.length(1);
  });

  it('should render an <CSSTransitionGroup> compoennt with transition git status and classes', () => {
    const wrapper = shallow(
      <Alert dismissable message = { props.message } />
    );

    const expectedTransition = Number(style.transition);
    const transitionEnter = wrapper.find(CSSTransitionGroup).props().transitionEnterTimeout;
    const transitionLeave = wrapper.find(CSSTransitionGroup).props().transitionLeaveTimeout;
    const leaveClass = wrapper.find(CSSTransitionGroup).props().transitionName.leave;
    const leaveActiveClass = wrapper.find(CSSTransitionGroup).props().transitionName.leaveActive;

    expect(transitionEnter).to.equal(expectedTransition);
    expect(transitionLeave).to.equal(expectedTransition);
    expect(leaveClass).to.equal(style.alertLeave);
    expect(leaveActiveClass).to.equal(style.alertLeaveActive);
  });

  it('should render an <Button> with class if buttonText and buttonClass prop is set', () => {
    const buttonClass = 'helloThere';
    const wrapper = shallow(
      <Alert message = { props.message } buttonText = 'hello' buttonClass = { buttonClass } />
    );

    expect(wrapper.find(Button)).to.have.length(1);
    expect(wrapper.find(Button).node.props.buttonClass.includes(buttonClass)).to.equal(true);
  });


  it('should render default messages if the message prop is not set.', () => {
    const infoMessage = mount(<Alert type = 'info' />);
    const dangerMessage = mount(<Alert type = 'danger' />);
    const successMessage = mount(<Alert type = 'success' />);
    const warningMessage = mount(<Alert type = 'warning' />);
    
    expect(infoMessage.find('PrintHtml').text()).to.equal(defaultInfo);
    expect(dangerMessage.find('PrintHtml').text()).to.equal(defaultDanger);
    expect(successMessage.find('PrintHtml').text()).to.equal(defaultSuccess);
    expect(warningMessage.find('PrintHtml').text()).to.equal(defaultWarning);
  });

  describe('handleDismissAlert()', () => {
    it('should set isVisible to false when called', () => {
      const wrapper = shallow(
        <Alert { ...props } />
      );

      wrapper.instance().handleDismissAlert();
      expect(wrapper.find(bootstrap.alert)).to.have.length(0);
    });
  });
});