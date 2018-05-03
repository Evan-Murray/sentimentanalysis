# imports
import tweepy
from textblob import TextBlob

# twitter access keys:
from credentials import *   

# Twitter API's setup:
def twitter_setup():
    auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
    auth.set_access_token(ACCESS_TOKEN, ACCESS_SECRET)
    api = tweepy.API(auth)
    return api

extractor = twitter_setup()
# searches for tweets containing the "q" parameter, value passed to items determines quantity returned

def gatherSentiment(term):
    tweets = tweepy.Cursor(extractor.search, q=str(term) + " -filter:retweets", tweet_mode="extended").items(100)
    processedTweets = []
    for tweet in tweets:
        obj = {}
        #obj['text'] = tweet.full_text
        #obj['url'] = 'https://twitter.com/'+ str(tweet.user.screen_name) + '/status/' + str(tweet.id)
        obj['polarity'] = TextBlob(tweet.full_text).sentiment.polarity
        processedTweets.append(obj)
    return processedTweets