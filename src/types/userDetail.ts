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
  bodyList: any,
  hatList?: any,
  eyesList?: any,
  shirtsList?: any,
  pantsList?: any
}
