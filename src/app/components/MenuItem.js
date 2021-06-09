import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'

const MenuItem = (props) => {

    return (
            <Menu 
                theme={props.theme} 
                mode={props.mode}
                selectedKeys={props.selectedKeys}
                onClick={props.click}
            >
                <Menu.Item key={props.item['active_key']} icon={props.item.renderIcon()}>
                    <Link 
                        to={props.item['link']}
                        className={props.item['classname']}                                                    
                        >
                        {props.item['title']}     
                    </Link>
                </Menu.Item> 
            </Menu>      
    )
}

export default MenuItem