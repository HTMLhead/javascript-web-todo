import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FoldBtn from './FoldBtn';
import FoldUl from './FoldUl';

class FoldableList extends React.Component {
  constructor(props) {
    super(props);
    this.toggleFold = this.toggleFold.bind(this);
    this.state = {
      folded: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { todoData } = this.props;

    if (todoData !== prevProps.todoData) {
      this.render();
    }
  }

  toggleFold() {
    const { folded } = this.state;

    this.setState({ folded: !folded });
  }

  render() {
    const { folded } = this.state;
    const {
      todoData, className, onDelClick, ItemTemplate,
    } = this.props;

    if (!todoData[0]) {
      return <div className={className}>Loading...</div>;
    }

    return (
      <div className={className}>
        <h2 className="listHeader">Things to Do</h2>
        <FoldBtn folded={folded} className="foldBtn" onClick={this.toggleFold} />
        <FoldUl folded={folded} className="foldUl">
          {todoData.map(item => (
            <ItemTemplate
              key={item.localId}
              todoTitle={item.title}
              onClick={onDelClick(item.localId)}
            />
          ))}
        </FoldUl>
      </div>
    );
  }
}

FoldableList.propTypes = {
  todoData: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string.isRequired,
  onDelClick: PropTypes.func.isRequired,
  ItemTemplate: PropTypes.oneOfType([
    PropTypes.shape({ styledComponentId: PropTypes.string }).isRequired, // StyledComponent
    PropTypes.node,
  ]).isRequired,
};

const StyledTodoList = styled(FoldableList)`
  display: grid;
  grid-template-columns: 85% 15%;
  grid-template-rows: 10% 10% 80%;

  grid-column: 2 / 3;
  grid-row: 4;

  font-size: 2rem;
  max-height: 32rem;
  overflow: hidden;

  .listHeader {
    grid-column: 1;
    grid-row: 2;
  }
  .foldBtn {
    grid-column: 2;
    grid-row: 2;
  }
  .foldUl {
    grid-row: 3;
    grid-column: 1 / 3;

    margin-top: 1rem;
    border-bottom: 1px dotted black;
    width: 103%;
    overflow-y: scroll;
  }
`;

export default StyledTodoList;
