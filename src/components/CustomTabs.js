
import { Route, Routes, Link,  useNavigate } from "react-router-dom";
import { Tab, Tabs, TabContainer, Nav } from "react-bootstrap";
/*
const tabs = [
    {
        tabTitle:"Reviews",
        tabKey:"reviews",
        tabLink:"reviews",
    }
]
*/

function getCategory(tabs, locString, rootURL){
    if(locString.length > rootURL.length){
      let category = locString.substring(rootURL.length)
      let endIndex = category.indexOf('/')
      if(endIndex !== -1){
        category = category.substring(0, endIndex)
      }

      for (let i = 0; i < tabs.length; i++) {
        tabs[i].tabLink.substring(rootURL.length)
        if (tabs[i].tabKey === category) 
          return category
      }
    }
    return tabs[0].tabLink.substring(rootURL.length);
}


export const MakeVerticalTabBar = ({tabs, loc, rootURL,className}) => {
    // console.log(' MakeVerticalTabBar getCategoPry(tabs, loc, rootURL)', getCategory(tabs, loc, rootURL))     
    return <Tab.Container fluid  activeKey={getCategory(tabs, loc, rootURL)} >
        <Nav variant="pills" className={"flex-column" + (className?(" " + className):"")} >

            {tabs.map((tab, index)=> {
                return (<Nav.Item key ={index}>
                    <Nav.Link eventKey={tab.tabKey} as={Link} to={tab.tabLink}>{tab.tabTitle}  </Nav.Link>
                </Nav.Item>)
            })}
        </Nav>
    </Tab.Container>
}


export const MakeVerticalTabBarBookshelf = ({tabs, loc, rootURL,className, userID}) => {
    // console.log(' MakeVerticalTabBar getCategoPry(tabs, loc, rootURL)', getCategory(tabs, loc, rootURL))     
    return <Tab.Container fluid  activeKey={getCategory(tabs, loc, rootURL)} >
        <Nav variant="pills" className={"flex-column" + (className?(" " + className):"")} >
            {tabs.map((tab, index)=> {
                return (<Nav.Item key ={index}>
                    <Nav.Link eventKey={tab.tabKey} as={Link} to={"/user/"+userID+tab.tabLink}>{tab.tabTitle}  </Nav.Link>
                </Nav.Item>)
            })}
        </Nav>
    </Tab.Container>
}


export const MakeHorizontalTabBar = ({tabs, loc, rootURL,className}) => {
    return <Tabs activeKey={getCategory(tabs, loc, rootURL)} className={className}>
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