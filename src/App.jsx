import React from 'react';
import _ from 'lodash';
import faker from 'faker';
import { renderUsers, getUsers, maxUsersCountOnPage } from './utils';

const initialUsers = _.times(400, () => faker.name.findName()).sort();

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			order: 'ascending',
			currentPage: 1,
			allUsers: initialUsers,
			filtredUsers: [],
			startIdxShowingUsers: 0,
			pageCount: Math.ceil(initialUsers.length / maxUsersCountOnPage),
		};
	}

	switchOrder = () => {
		const { order, allUsers, filtredUsers } = this.state;
		const users = getUsers(filtredUsers, allUsers);
		const currentKey = filtredUsers.length > 0 ? 'filtredUsers' : 'allUsers';
		switch (order) {
			case 'ascending':
				this.setState({ [currentKey]: users.reverse(), order: 'descending' });
				break;
			case 'descending':
				this.setState({ [currentKey]: _.sortBy(users), order: 'ascending' });
				break;
			default:
				throw Error(`Order is not supported: ${order}`);
		}
	};

	changeCurrentPage = (numPage) => () => {
		const { pageCount } = this.state;
		if (numPage < 1 || numPage > pageCount) return;
		this.setState({
			currentPage: numPage,
			startIdxShowingUsers: maxUsersCountOnPage * (numPage - 1),
		});
	};

	searchUsers = (e) => {
		e.preventDefault();
		const { allUsers } = this.state;
		const { value } = e.target;
		const filtredUsers = allUsers.filter((userName) => (
			userName.toLowerCase().includes(value.toLowerCase())
		));
		if (filtredUsers.length === 0 && value.length > 0) {
			this.setState({ filtredUsers: ['No match for request'], pageCount: 1 });
			return;
		}
		this.setState({
			filtredUsers,
			pageCount: Math.ceil(filtredUsers.length / maxUsersCountOnPage),
		});
	};

	componentDidMount() {
		document.getElementById('search').focus();
	}

	render() {
		const {
			filtredUsers,
			allUsers,
			pageCount,
			currentPage,
			startIdxShowingUsers,
			order,
		} = this.state;
		const users = getUsers(filtredUsers, allUsers);
		console.log('state=>', this.state);

		return (
			<div className="container">
				<form className="mt-3 mx-3">
					<div className="form-group row">
						<input
							onChange={this.searchUsers}
							type="text"
							className="form-control col-6"
							id="search"
							aria-describedby="search"
							placeholder="Search name"
						/>
					</div>
				</form>
				<div
					className="btn-toolbar"
					role="toolbar"
					aria-label="Toolbar with button groups"
				>
					<div
						className="btn-group mr-2"
						role="group"
						aria-label="Basic example"
					>
						<button
							disabled={currentPage === 1}
							onClick={this.changeCurrentPage(currentPage - 1)}
							key="first"
							type="button"
							className="btn btn-secondary"
						>
							〈
						</button>
						{_.times(pageCount, (i) => {
							const currentBtn = i + 1;
							return (
								<button
									onClick={this.changeCurrentPage(currentBtn)}
									key={i + 1}
									type="button"
									className={`btn btn-secondary${
										currentBtn === currentPage ? 'active' : ''
									}`}
								>
									{i + 1}
								</button>
							);
						})}
						<button
							disabled={currentPage === pageCount}
							onClick={this.changeCurrentPage(currentPage + 1)}
							key="last"
							type="button"
							className="btn btn-secondary"
						>
							〉
						</button>
					</div>
					<div
						className="btn-group mr-2"
						role="group"
						aria-label="Second group"
					>
						<button
							onClick={this.switchOrder}
							type="button"
							className="btn btn-secondary"
						>
							Change order on{' '}
							{order === 'ascending' ? 'descending' : 'ascending'}
						</button>
					</div>
				</div>
				{renderUsers(users, startIdxShowingUsers)}
			</div>
		);
	}
}

export default App;
