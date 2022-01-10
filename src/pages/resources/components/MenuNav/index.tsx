import React from 'react';
import Styles from "./styles.module.scss";
import config, { IConfig, IConfigItem } from '../../config';
import { flatten } from '../../../../utils';

function getAllTags(config: IConfig) { 
  let result = new Set()

  const waitForHandleConfig = flatten(Object.values(config));

  waitForHandleConfig.forEach((item: IConfigItem) => { 
    !result.has(item.tags) && result.add(item.tags)
  })

  return Array.from(result) as string[];
}

function MenuNav() {
  const tags = getAllTags(config);
  
  return (
    <div className={ Styles.main}>aa</div>
  )
}

export default MenuNav;