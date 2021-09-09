/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const tweetsDB = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1630868436138
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1630954836138
//   }
// ]


$( document ).ready(function() {

  // const createTweetElement = function(tweetObj){
  //   let tweetArticle = [];
  //   for (tweet in tweetObj){
  //     tweetArticle.unshift(`
  //     <article>
  //     <header>
  //     <div>
  //     <img src = ${escape(tweetObj[tweet].user.avatars)} alt = ${escape(tweetObj[tweet].user.name)}>
  //     <p><strong>${escape(tweetObj[tweet].user.name)}</strong></p>
  //     </div>
  //     <p>${escape(tweetObj[tweet].user.handle)}</p>
  //     </header>
  //     <main>${escape(tweetObj[tweet].content.text)}</main>
  //     <footer>
  //     <p>${escape(timeago.format(tweetObj[tweet].created_at))}</p>
  //     <div class = "bottom-icons">
  //     <i class="fas fa-flag"></i>
  //     <i class="fas fa-retweet"></i>
  //     <i class="fas fa-heart"></i>
  //     </div>
  //     </footer>
  //     </article>
  //     `)
  //   }
  // return tweetArticle;
  
  // }
  
  //const $tweet = createTweetElement(tweetsDB);
  
  // const renderTweets = function(tweet){
  //   let tweetArray = createTweetElement(tweet);
  // for (let element of tweetArray){
  //    $('.tweet').append(element)
  // }
  // }
  
 

//   const loadTweets = function(){
//     $.ajax('/tweets', { method: 'GET' })
//     .then(function (tweets) {
//       $('#tweet-container').empty()
//       renderTweets(tweets);    
// });
//   }
  loadTweets();

 
  $("#target").on('submit',function( event ){
    //alert( "Handler for .submit() called." );
    if ($('.counter').val() < 0){
      event.preventDefault();
      $('#emptyTweet').slideUp("slow", function() {$('#emptyTweet').addClass('hidden')});
      return $('#charLimit').slideDown("slow", function() {$('#charLimit').removeClass('hidden')});
      
      //return alert('Message Limit: Maximum of 140 Characters')
    }if($('.counter').val() > 139){
      event.preventDefault();
      $('#charLimit').slideUp("slow", function() {$('#charLimit').addClass('hidden')});
      return $('#emptyTweet').slideDown("slow", function() {$('#emptyTweet').removeClass('hidden')});
      //return alert('Tweet Cannot Be Empty')
   }
    
    // event.preventDefault();
    const serializedData = $(this).serialize();

    $('#charLimit').slideUp("slow", function() {$('#charLimit').addClass('hidden')});
    $('#emptyTweet').slideUp("slow", function() {$('#emptyTweet').addClass('hidden')});


    
    //Form Input: Validation
    //console.log($('#tweet-text').val().length)
    

    $.ajax({
      type: "POST",
      url: "/tweets",
      data: serializedData,
    }).done(function(){
      loadTweets()
      $('#tweet-text').val('')
      $('.counter').val(140)
    });

    event.preventDefault();
    
    //setTimeout($("#tweet-container").fadeIn("slow",$("#tweet-container").load(location.href + " #tweet-container")), 200)
    //loadTweets();
  });

});

const createTweetElement = function(tweetObj){
  let tweetArticle = [];
  for (tweet in tweetObj){
    tweetArticle.unshift(`
    <article class= "tweet">
    <article>
    <header>
    <div>
    <img src = ${escape(tweetObj[tweet].user.avatars)} alt = ${escape(tweetObj[tweet].user.name)}>
    <p><strong>${escape(tweetObj[tweet].user.name)}</strong></p>
    </div>
    <p>${escape(tweetObj[tweet].user.handle)}</p>
    </header>
    <main>${escape(tweetObj[tweet].content.text)}</main>
    <footer>
    <p>${escape(timeago.format(tweetObj[tweet].created_at))}</p>
    <div class = "bottom-icons">
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
    </div>
    </footer>
    </article>
    </article>
    `)
  }
return tweetArticle;
}

const renderTweets = function(tweet){
  let tweetArray = createTweetElement(tweet);
for (let element of tweetArray){
  console.log(element)
   $('#tweet-container').append(element)
}
}

const loadTweets = function(){
  $.ajax('/tweets', { method: 'GET' })
  .done(function (tweets) {
    $('#tweet-container').empty()
    renderTweets(tweets);   
    console.log(tweets) 
});
}
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
