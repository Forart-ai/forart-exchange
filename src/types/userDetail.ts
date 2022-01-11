export interface UserDetail {
  id:string,
  username: string,
  describe: string,
  followers: any,
  // followersAvatar: any,
  slogan:string
  avatar?: string,
  backgroundImage?: string,
  artDetail?: any
}


export interface ArtistKit {
  id: string,
  body: any,
  hat?: any,
  face?: any,
  shirts?: any,
  pants?: any,
  cloth?: any,
  feet?: any,
  glasses?: any,
  hand?: any,
  item?: any,
  shoe?: any
}
