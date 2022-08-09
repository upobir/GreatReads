
import { Route, Routes, Link,  useNavigate } from "react-router-dom";
import { Tab, Tabs, TabContainer, Nav } from "react-bootstrap";
/*
const tabs = [
    {
        tabTitle:"Reviews",
        tabKey:"reviews",
        tabLink:"reviews",
        tabContentElement: <BookReviews bookID={id} reviews={_book.reviews} />
    }
]
*/

function getCategory(tabs, locString, firstPart){
    if(locString.length > firstPart.length){
      let category = locString.substring(firstPart.length)
      let endIndex = category.indexOf('/')
      if(endIndex !== -1){
        category = category.substring(0, endIndex)
      }

      for (let i = 0; i < tabs.length; i++) {
        tabs[i].tabLink.substring(firstPart.length)
        if (tabs[i].tabKey === category) 
          return category
      }
    }
    return tabs[0].tabLink.substring(firstPart.length);
}


export const MakeVerticalTabBar = ({tabs, loc, firstPart,className}) => {
    // console.log(' MakeVerticalTabBar getCategoPry(tabs, loc, firstPart)', getCategory(tabs, loc, firstPart))     
    return <Tab.Container fluid  activeKey={getCategory(tabs, loc, firstPart)} >
        <Nav variant="pills" className={"flex-column" + (className?(" " + className):"")} >

            {tabs.map((tab, index)=> {
                return (<Nav.Item key ={index}>
                    <Nav.Link eventKey={tab.tabKey} as={Link} to={tab.tabLink}>{tab.tabTitle}  </Nav.Link>
                </Nav.Item>)
            })}
        </Nav>
    </Tab.Container>
}


export const MakeHorizontalTabBar = ({tabs, loc, firstPart,className}) => {
    return <Tabs defaultActiveKey={getCategory(tabs, loc, firstPart)} className={className}>
            {tabs.map((tab, index)=> {
                return (
                    <Tab key={index}
                        eventKey={tab.tabKey} 
                        as={Link} 
                        to={tab.tabLink} 
                        title={tab.tabTitle}>
                    </Tab>
                )})}
        </Tabs>
}

export const MakeTabContent  = ({tabs, additional_class}) =>{
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