import { IMAGE_URL } from '../shared/apiConfigurations';
import { Share } from 'react-native';

export const handleShare = async (item) => {
    try {
      let message;
      if(item.image){
         message =  item.title + '\n' + '\n'
        + item.overview + '\n' + '\n' 
        + IMAGE_URL + 'w500/' + item.backdrop_path 
      }else{
        message =  item.title + '\n' + '\n'
        + item.overview 
      }
        const result = await Share.share({
          title: item.title,
        //   message: item.overview + IMAGE_URL + 'w500/' + item.backdrop_path,
          message: message
        });
  
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
  };