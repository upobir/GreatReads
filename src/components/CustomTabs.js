
const tabs = [
    {
        tabTitle:"Reviews",
        tabKey:"reviews",
        tabLink:"/reviews",
        tabContentElement: <BookReviews bookID={id} reviews={_book.reviews} />
    }
]

export const makeTabBar = ({tabs, additional_class}) =>{
    const handleTabChange = (eventKey, e) => {
        navigate(eventKey); 
    };

    return <>
        <Tabs defaultActiveKey={tabs[0].tabKey} onSelect={handleTabChange} className={additional_class}>
            {
                tabs.map(tab =>{
                    return <Tab eventKey={tab.tabKey} title={tab.tabTitle}></Tab>
                })
            }
        </Tabs>
    </> 
}

export const makeTabContent  = ({tabs, additional_class}) =>{
    return <>
        <Routes>
            <Route path="/" element={tabs[0].tabContentElement} />
            {
                tabs.map(tab =>{
                    return <Route path={tab.tabLink} element={tab.tabContentElement} />
                })
            }
        </Routes>
    </>
}