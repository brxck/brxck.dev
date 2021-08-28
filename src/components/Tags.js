import React from 'react'

export default function Tags({ tags }) {
  return (
    <ul className="flex gap-1 pb-5">
      {tags.map((tech, index) => (
        <li
          className="px-1 py-0.5 text-xs text-indigo-600 border border-indigo-600 rounded-md dark:text-green-500 dark:border-green-600"
          key={index}
        >
          {tech}
        </li>
      ))}
    </ul>
  )
}
