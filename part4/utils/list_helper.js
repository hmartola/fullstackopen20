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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}