import  {Config, Env } from '../Config';

export default class Util{
    
    /**
     * Generates random string
     * @param length 
     * @returns random string 
     */
    public static generateRandomString(length:number):string{
        let result=``;
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * 
            characters.length));
        }
        return result;
    }

    /**
     * Generates otp
     * @returns otp 
     */
    public static generateOtp():string{
        let result=``;
        let characters = '0123456789';
        for ( let i = 0; i < 4; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * 
            characters.length));
        }
        return result;
    }

    /**
     * Gets domain
     * @returns  domain
     */
    public static getDomain(){
        if(Config.env===Env.prod){
            return Config.domain;
        }else{
            return `http://localhost:${Config.port}`
        }
    }
    
  


    public static generatePassword(passwordLength:number) {
        var numberChars = "0123456789";
        var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var lowerChars = "abcdefghijklmnopqrstuvwxyz";
        var specialChars = "#?!@$%^&*-";
        var allChars = numberChars + upperChars + lowerChars + specialChars;
        var randPasswordArray = Array(passwordLength);
        randPasswordArray[0] = numberChars;
        randPasswordArray[1] = upperChars;
        randPasswordArray[2] = lowerChars;
        randPasswordArray[3] = specialChars;
        randPasswordArray = randPasswordArray.fill(allChars, 4);
        return this.shuffleArray(randPasswordArray.map(function(x) { return x[Math.floor(Math.random() * x.length)] })).join('');
      }
      
    private static shuffleArray(array:any) {
        for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array;
      }

}


export {Util};