import _ from 'lodash';

export const maxUsersCountOnPage = 50;

export const renderUsers = (users, fromIdx = 0) => (
	<table className="table mt-2 table-hover">
		<thead>
			<tr>
				<th scope="col">#</th>
				<th scope="col">Full name</th>
			</tr>
		</thead>
		<tbody>
			{_.times(Math.min(users.length, maxUsersCountOnPage), (i) => {
				const fullName = users[fromIdx + i];
				return (
					<tr key={`${i}${fullName.slice(0, fullName.indexOf(' '))}`}>
						<th scope="row">{i + 1}</th>
						<td>{fullName}</td>
					</tr>
				);
			})}
		</tbody>
	</table>
);

export const getUsers = (filtredUsers, allUsers) =>
	filtredUsers.length > 0 ? filtredUsers : allUsers;