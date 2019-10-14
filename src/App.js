import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			kittens: [],
			owners: [],
			isLoggedIn: false
		};
	}
	fetchKittens = () => {
		//some fetching code
		const kittens = [{ name: "fluffy", age: 2, sex: "female" }];
		const url = "http://localhost:5000/kittens";
		axios
			.get(url)
			.then(res => {
				this.setState({ kittens: res.data });
			})
			.catch(err => {
				console.error(err);
				this.setState({ kittens: [] });
			});

		this.setState({ kittens });
	};

	fetchOwners = () => {
		const url = "http://localhost:5000/owners/papaya";
		axios
			.get(url, { withCredentials: true })
			.then(res => {
				this.setState({ owners: [res.data] });
			})
			.catch(err => {
				console.error(err);
				this.setState({ owners: [] });
			});
	};

	loginHandler = () => {
		const url = "http://localhost:5000/owners/login";
		// url, payload, options
		axios
			.post(
				url,
				{
					username: "papaya",
					password: "1234567"
				},
				{ withCredentials: true }
			)
			.then(() => {
				this.setState({ isLoggedIn: true });
			})
			.catch(err => {
				console.error(err);
				this.setState({ isLoggedIn: false });
			});
	};

	logoutHandler = () => {
		const url = "http://localhost:5000/owners/logout";
		axios
			.post(url, {}, { withCredentials: true })
			.then(() => {
				this.setState({ isLoggedIn: false });
			})
			.catch(err => {
				console.error(err);
			});
	};

	adoptKitten = name => {
		const url = "http://localhost:5000/kittens/" + name;
		axios
			.delete(url, { withCredentials: true })
			.then(res => {
				console.log(res);
				this.fetchKittens();
			})
			.catch(err => {
				console.error(err);
			});
	};

	render() {
		return (
			<div className="App">
				<div className="access">
					<button onClick={this.loginHandler}>Login</button>
					<button onClick={this.logoutHandler}>Logout</button>
					<p>
						{this.state.isLoggedIn
							? "You're logged in"
							: "You're not logged in"}
					</p>
				</div>
				<button onClick={this.fetchOwners}>
					Get username of owner (protected)!
				</button>
				{this.state.owners.map(owner => {
					return <p key={owner.fullName}>{owner.fullName}</p>;
				})}
				<button onClick={this.fetchKittens}>Get me all kittens!</button>
				{this.state.kittens.map(kitten => {
					return (
						<div key={kitten.name}>
							<p>Name: {kitten.name}</p>
							<p>{kitten.sex}</p>
							<p>{kitten.age} years old</p>
							<button onClick={() => this.adoptKitten(kitten.name)}>
								Adopt kitten!
							</button>
						</div>
					);
				})}

				<footer>No kittens were harmed in the making of said site</footer>
			</div>
		);
	}
}

export default App;
