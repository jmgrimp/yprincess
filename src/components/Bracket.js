import React from 'react';
import TopMenu from './TopMenu';

class Bracket extends React.Component {
	render() {
		return (
			<div id="Bracket">
				<TopMenu />
				<div className="container pure-g bracket">
					<article className="bracket__rounds">
						<section className="bracket__round--one">
							<header>{'Round 1'}</header>
							<ul>
								<li className="bracket__game">
									<div className="bracket__game__team">
									</div>
									<div className="bracket__game__team">
									</div>
								</li>
								<li className="bracket__game">
									<div className="bracket__game__team">
									</div>
									<div className="bracket__game__team">
									</div>
								</li>
								<li className="bracket__game">
									<div className="bracket__game__team">
									</div>
									<div className="bracket__game__team">
									</div>
								</li>
								<li className="bracket__game">
									<div className="bracket__game__team">
									</div>
									<div className="bracket__game__team">
									</div>
								</li>
								<li className="bracket__game">
									<div className="bracket__game__team">
									</div>
									<div className="bracket__game__team">
									</div>
								</li>
								<li className="bracket__game">
									<div className="bracket__game__team">
									</div>
									<div className="bracket__game__team">
									</div>
								</li>
								<li className="bracket__game">
									<div className="bracket__game__team">
									</div>
									<div className="bracket__game__team">
									</div>
								</li>
								<li className="bracket__game">
									<div className="bracket__game__team">
									</div>
									<div className="bracket__game__team">
									</div>
								</li>
							</ul>
						</section>
						<section className="bracket__round--one">
							<header>{'Round 2'}</header>
							<ul>
								<li className="bracket__game">
									<div className="bracket__game__team">
									</div>
									<div className="bracket__game__team">
									</div>
								</li>
								<li className="bracket__game">
									<div className="bracket__game__team">
									</div>
									<div className="bracket__game__team">
									</div>
								</li>
								<li className="bracket__game">
									<div className="bracket__game__team">
									</div>
									<div className="bracket__game__team">
									</div>
								</li>
								<li className="bracket__game">
									<div className="bracket__game__team">
									</div>
									<div className="bracket__game__team">
									</div>
								</li>
							</ul>
						</section>
						<section className="bracket__round--one">
							<header>{'Round 3'}</header>
							<ul>
								<li className="bracket__game">
									<div className="bracket__game__team">
									</div>
									<div className="bracket__game__team">
									</div>
								</li>
								<li className="bracket__game">
									<div className="bracket__game__team">
									</div>
									<div className="bracket__game__team">
									</div>
								</li>
							</ul>
						</section>
					</article>
				</div>
			</div>
		);
	}
};

export default Bracket;