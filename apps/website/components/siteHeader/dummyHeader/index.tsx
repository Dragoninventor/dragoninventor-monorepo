// A dummy header component with the same width as header on wide displays to center content with header sidebar

const DummyHeader = () => {
	return <div className={"-order-2 xl:w-40"}></div>;
};

export default DummyHeader;
