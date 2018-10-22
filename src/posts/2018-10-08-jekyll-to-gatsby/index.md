---
title: Moving from Jekyll to Gatsby
date: 2018-10-08
tags: Gatsby React GraphQL Jekyll Web
---

I've migrated my site from [Jekyll](https://jekyllrb.com/) to [GatsbyJS](https://www.gatsbyjs.org/), the static site generator built on React, webpack, and GraphQL. I got to work with some new, buzzy techs and I ended up with a cooler, snappier site at the end of it!

## Why I Moved

Primarily, I'm learning React and I wanted some easy practice; the opportunity to write some GraphQL queries was a nice bonus. Gatsby takes care of all the setup (and routing and server-side rendering, etc.) so I was able to jump right into writing JSX and GraphQL.

I found that Gatsby also makes it easy to incorporate some new web technologies that take a lot more work to get up and running in Jekyll — for instance, it's so much easier to get responsive images with progressive loading up and running.

But the biggest difference is Gatsby lets you build with React, and (if you like React) that's pretty neat!

## Migrating

The best part about Jekyll is that it lets you generate blog posts from Markdown, and of course Gatsby has a plug-in for that. Moving post content over is pretty straightforward. 

I originally chose Jekyll as my generator because it's supported by [GitHub Pages](https://pages.github.com/). All you've got to do is push your source up and GitHub will build and host it for you, for free! But you have to use Jekyll, and then only with predetermined plugins. Because I was was using custom Jekyll plugins, I was building my site locally and *then* pushing it up, so I had already lost some of that convenience. And actually, that is how you can use any static generator, like Gatsby, with GitHub Pages: build local, and push it up after. 

But then again, maybe you've got better options. Building yourself and managing that generated site is kind of a hassle. I moved over to [Netlify.i](https://www.netlify.com/) They've got a free hosting tier, and as soon as you push up your Gatsby source they'll build and host it for you. On top of that, they make it really easy to manage SSL and even your DNS records.

## Pain Points

GraphQL is *pretty neat™* but if you're not familiar it can be a pretty frustrating experience learning the language and filters just to display a local image two folders over. 

## I Like Gatsby

I would do it again, and if you're interested in modern frontend tech I would definitely recommend giving Gatsby a shot.
