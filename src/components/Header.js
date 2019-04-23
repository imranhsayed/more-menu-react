import React from 'react';
import { menuData } from "./menu-data";
import {
	DesktopNavContainer,
	DesktopHeaderMain,
	DesktopNavWrap,
	DesktopNavList,
	DesktopNavLink,
	DesktopMoreListContainer,
	DesktopMoreListItem,
	DesktopMoreListLink,
} from "./MenuElements";

class Header extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			currentIndex: '',
			hiddenItems: [],
		};
		this.primaryContainer = React.createRef();
		this.moreEl = React.createRef();
		this.secondaryContainer = React.createRef();
	}

	componentDidMount() {
		// Adapt Immediately on load
		this.doAdapt();

		// Then call doAdapt() when window is resized.
		window.addEventListener('resize', this.doAdapt);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.doAdapt);
	}

	/**
	 * Gets called on window resize and handles menu items visibility.
	 */
	doAdapt = () => {
		// Return on smaller screens
		if (window.innerWidth < 700) {
			return;
		}

		let moreBtnWidth = this.moreEl.current
			? this.moreEl.current.offsetWidth
			: 0;
		const primaryContainerWidth = this.primaryContainer.current
			? this.primaryContainer.current.offsetWidth
			: 0;
		const primaryItems = this.primaryContainer.current
			? this.primaryContainer.current.childNodes
			: [];
		const allListItems = this.primaryContainer.current
			? this.primaryContainer.current.querySelectorAll('li')
			: [];

		// Reveal all list-items first.
		if (allListItems.length) {
			allListItems.forEach((item) => {
				item.classList.remove('--hidden');
			});
		}

		/**
		 * Check if the item fits in the container, hide the item if not and save its index for later use.
		 * @type {number}
		 */
		if (primaryItems.length) {
			primaryItems.forEach((item, index) => {
				let isSecondaryItem = item.classList.contains('-more');

				// Check if its not the secondary Item( more element )
				if (!isSecondaryItem) {
					/**
					 * If the (itemWidth + moreBtnWidth) is less/equal to the (container width - 160px for menu icon and searchicon),
					 * increment the moreBtnWidth by adding item width.
					 * Remove this index from the hiddenItems Array, if it exists.
					 */
					if (moreBtnWidth + item.offsetWidth <= primaryContainerWidth - 160) {
						moreBtnWidth += item.offsetWidth;

						let newArray = this.state.hiddenItems;
						let removableIndex = newArray.indexOf(index);
						if (removableIndex > -1) {
							newArray.splice(removableIndex, 1);
						}
						const distinctArray = [...new Set(newArray)];
						this.setState({ hiddenItems: distinctArray });
					} else {
						/**
						 * If the itemWidth + moreBtnWidth is greater than the (container width - 160px for menu icon and searchicon),
						 * hide that item
						 * Add this index from the hiddenItems Array, if it does not exit already.
						 */
						item.classList.add('--hidden');

						let newArray = this.state.hiddenItems;
						newArray.push(index);
						const distinctArray = [...new Set(newArray)];
						this.setState({ hiddenItems: distinctArray });
					}
				}
			});
		}

		// If there are no hidden items then hide More Element.
		if (!this.state.hiddenItems.length && this.moreEl.current) {
			this.moreEl.current.classList.add('--hidden');
		}

		// Hide the equivalent items from the secondary list that remained visible in the primary one
		else {
			let secondaryItems = this.secondaryContainer.current
				? this.secondaryContainer.current.childNodes
				: [];
			if (secondaryItems.length) {
				secondaryItems.forEach((item, index) => {
					if (!this.state.hiddenItems.includes(index)) {
						item.classList.add('--hidden');
					}
				});
			}
		}
	};

	/**
	 * Render all menu items under More
	 */
	renderMoreItem = () => {
		return (
			<DesktopNavList ref={this.moreEl} className="-more --hidden">
				<DesktopNavLink className="cts-more-element" href="#">
					More
				</DesktopNavLink>
				<DesktopMoreListContainer
					ref={this.secondaryContainer}
					className={`-secondary`}>
					{menuData.map((menuItem) => (
						<DesktopMoreListItem key={menuItem.url}>
							<DesktopMoreListLink href={menuItem.url}>
								{menuItem.label}
							</DesktopMoreListLink>
						</DesktopMoreListItem>
					))}
				</DesktopMoreListContainer>
			</DesktopNavList>
		);
	};

	render() {
		return(
			<DesktopHeaderMain>
				<DesktopNavWrap>
					<DesktopNavContainer ref={this.primaryContainer}>
						{menuData.map((item) => (
							<DesktopNavList key={item.url} className="primary-items">
								<DesktopNavLink
									className="cts-primary-link"
									href={item.url}>
									{item.label}
								</DesktopNavLink>
							</DesktopNavList>
						))}
						{this.renderMoreItem()}
					</DesktopNavContainer>
				</DesktopNavWrap>
			</DesktopHeaderMain>
		)
	}
}

export default Header;
