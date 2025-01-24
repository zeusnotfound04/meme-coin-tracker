
import dotenv from "dotenv";
import { ThrowStatement } from "typescript";
import { getTweets } from "./getTweets";


dotenv.config();



async function main(userId : string)  {
    const newTweets  = await getTweets(userId);
    console.log(newTweets);
    // for (const tweet of newTweets){
    //     const tokenAddress = await getTokenFromLLM(tweet.description);
    //     if(tokenAddress){
    //         const txn = await createSwapInstruction();
    //         for (let i = 0 ; i < SPAM_COUNT ; i++){
    //             sendTxn(txn);
    //         }
    //     }
    // }
}


main("44196397")