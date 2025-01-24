import axios from 'axios';

const TweetMaxTimeMS = 60 * 1000; // 1 minute

interface Tweet {
    id: string;
    content: string;
    createdAt: string;
}

export async function getTweets(userId: string): Promise<Tweet[]> {
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://twitter241.p.rapidapi.com/user-tweets?user=${userId}&count=20`,
        headers: { 
            'x-rapidapi-host': 'twitter241.p.rapidapi.com', 
            'x-rapidapi-key': process.env.RAPID_API_KEY
        }
    };
            const tweets: Tweet[] = [];
    try {
        const response = await axios.request(config);
        const instructions = response.data.result?.timeline?.instructions;

        if (!instructions || !Array.isArray(instructions)) {
            console.error("Invalid response: instructions not found");
            return [];
        }



        instructions.forEach((instruction: any) => {
            if (instruction.entries) {
                instruction.entries.forEach((entry: any) => {
                    const tweet = entry.content?.itemContent?.tweet_results?.result?.legacy;
                    if (tweet) {
                        tweets.push({
                            id: tweet.id_str,
                            content: tweet.full_text,
                            createdAt: tweet.created_at,
                        });
                    }
                });
            }
        });


    } catch (error) {
        console.error("Error fetching tweets:", error);
        return [];
    }
            return tweets;
}
