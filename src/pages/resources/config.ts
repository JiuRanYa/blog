export interface IConfigItem { 
  title: string,
  tags: string,
  link: string
}

export interface IConfig {
  '美化': IConfigItem[]
}

const config: IConfig  = {
  '美化': [
    {
      title: 'undraw',
      tags: 'resources',
      link: 'https://undraw.co/'
    }
  ],
}

export default config;