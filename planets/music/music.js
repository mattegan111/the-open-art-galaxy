let div0 = document.getElementById('div0')
let div1 = document.getElementById('div1')
let div2 = document.getElementById('div2')
let div3 = document.getElementById('div3')

let images = ["images/bloc-party.png", "images/elephant-gym.jpeg", "images/Enter-Shikari.jpeg", "images/mom-jeans.jpeg", "images/dartz.jpeg", "images/paramore.jpeg", "images/midwest-penpals.jpeg", "images/best-witches.jpeg"]

let links = ["https://open.spotify.com/album/24mE0f0UXWd9YEpmKC3JtJ", "https://open.spotify.com/artist/2rqNUPgkBgbhcRabUQ5C9g/discography/album?pageUri=spotify:album:61PntG5EJgzniCaVz1TjTE", "https://open.spotify.com/album/6fNh9YNRZaPLYbQ51mS7Mk", "https://open.spotify.com/album/2xWDClEECAeZL7pFPFsi74", "https://open.spotify.com/album/1bv8QYFfIpn423Fb1jZS4a", "https://open.spotify.com/album/4sgYpkIASM1jVlNC8Wp9oF", "https://open.spotify.com/album/31ejCOcqHBAuoVSbgeV5rM", "https://open.spotify.com/album/5bIBtjxw1dfNPVkMqSyx0B"]

let a0 = document.createElement('a')
let a1 = document.createElement('a')
let a2 = document.createElement('a')
let a3 = document.createElement('a')

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

let img0 = document.createElement('img')
let img1 = document.createElement('img')
let img2 = document.createElement('img')
let img3 = document.createElement('img')

function image() {
  let num = getRandomNumber(0, images.length)
  img0.src = images[num]
  a0.href = links[num]
}
image()
function image1() {
  let num = getRandomNumber(0, images.length)
  img1.src = images[num]
  a1.href = links[num]
}
image1()
function image2() {
  let num = getRandomNumber(0, images.length)
  img2.src = images[num]
  a2.href = links[num]
}
image2()
function image3() {
  let num = getRandomNumber(0, images.length)
  img3.src = images[num]
  a3.href = links[num]
}
image3()

div0.appendChild(a0).appendChild(img0)
div1.appendChild(a1).appendChild(img1)
div2.appendChild(a2).appendChild(img2)
div3.appendChild(a3).appendChild(img3)
