import { IMAGE_URL } from '../shared/apiConfigurations';
import { Share } from 'react-native';

/**
 * this function is fired when the user clicks on the share icon in MovieCard component.
 * shares the item informations to a third party app/activity
 * @param  {item} object       The item to be shared.
 */
export const handleShare = async (item) => {
    try {
      // initiate the message
      let message;
      if(item.backdrop_path){
        // if the item doesn't contian an image,
        // remove it from the message
         message =  item.title + '\n' + '\n'
        + item.overview + '\n' + '\n' 
        + IMAGE_URL + 'w500/' + item.backdrop_path 
      }else{
        // if it contains an image,
        // add it to the message
        message =  item.title + '\n' + '\n'
        + item.overview 
      }
        const result = await Share.share({
          title: item.title,
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