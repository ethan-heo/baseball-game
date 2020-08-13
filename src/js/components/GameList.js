import Component from '../module/component';

function getGameListTemplate({ id, digitNumber, status }) {
  return `
    <div class="col-sm-4 col-md-3">
        <div class="thumbnail">
        <div id="${id}" class="caption">
            <h3>${digitNumber}자리 게임</h3>
            <p>id: ${id}</p>
            <p>
            <a href="game.html?id=${id}&digit=${digitNumber}" class="btn btn-primary btn-continue-game ${
    status === 'done' && 'disabled'
  }">이어하기</a>
            <a href="#" class="btn btn-danger btn-delete-game" data-id="${id}">삭제하기</a>
            </p>
        </div>
        </div>
    </div>
    `;
}

export class GameList extends Component {
  constructor({ el, state }) {
    super({ state });

    this.el = el;
  }

  render(state) {
    this.el.innerHTML = state.map((game) => getGameListTemplate(game)).join('');
  }
}
