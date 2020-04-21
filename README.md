# Welcome to the router thingy!
It does stuff!

# Instructions for use:
## There are two main routes:
The jplRoute calls directly from the jsonplaceholder.typecode.com data set
The second pulls information from a local instance of MongoDB

##The jplRoute

### Each route has a specific function
For instance, if you woud like to view all of the user posts, tpe in the following into a URL bar:

### jpl/allPosts
This retieves all of the posts made by users in beautiful json

If you would like to get all of the posts made by a specific user, type:

### jpl/allPosts/(username)
This retrieves all the posts made by the user

Next, perhaps you would like to see a specific post you happen to know the id for...
Simple! Type:

### jpl/posts/<id>
And that will return the posts for which you are looking

Finally, for the jplRoute, if you would like to see the profile of a user, type:

### jpl/profile/(username)
And that will bring up their informaion

## The mongoRoute

### These routes are exactly the same as the ones above with a few additions..

Firstly, be sure to replace 'jpl' with 'mongo' when typing in the route

Secondly, since we can manipulte the data on our own serve, there are some addition functions

For instance! Now you can add a post to a specific usernames account! Just type in

###/mongo/addPost/(username) along with a title and a body in body of the put like so:

```
{
	"title": "This is the title!"
	"body": "This is my message!"
}
```
Send it and the function will automatically apply the userId and the message id. Easy Peasy!

You can also update that same post or anyt other post where you know the id. Just type:

###/mongo/updatePost/(id) allong with the message to be added like so:
```
{
	"body": "This is the updated message!"
}
```
The function will add all of the other information about the post for you.

###FINALLY
You can now delete a specific post! Just type:

### /mongo/deletePost/(id)
And POOF! It will be gone. 

And that's it! I sure hope you enjoy it and give this student a 100 on it lol!