const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  } 
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (prev, item) => {
    if (prev.likes < item.likes){
      return item
    } else {
      return prev
    }
  }
  return blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {
  var amount = {}
  blogs.forEach(function(a) {
    amount[a.author] = (amount[a.author] || 0) + 1
  })
  const name = Object.keys(amount).reduce((a,b) => {
    if (amount[a] > amount[b])
      return a
    else
      return b 
  })
  const max = Math.max(...Object.values(amount))

  return {author: name, blogs: max}
}

const mostLikes = (blogs) => {
  const sumOfLikes = blogs.reduce((a, {author, likes}) => {
    a[author] = a[author] || {author, likes: 0}
    a[author].likes += likes
    return a 
  }, {})

  const final = Object.values(sumOfLikes).reduce((a,b) => {
    if (a.likes > b.likes)
      return a
    else
      return b
  })

  return {author: final.author, likes: final.likes}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}