import React from 'react'
import { imgUrl } from './Utils.jsx'

const File = ({name}) =>
  <li className="file">
    <img src={imgUrl('file.svg')} alt={`${name} file`}/>
    {name}
  </li>

const Dir = ({name, contents}) =>
  <>
    <li className="dir">
      <img src={imgUrl('folder.svg')} alt={`${name} file`}/>
      {name}
    </li>
    <FileTree contents={contents}/>
  </>

const FileTree = ({contents, className='dir'}) =>
  <ul className={className}>
    { contents.map(
      item => item.file
        ? <File name={item.file} key={item.file}/>
        : <Dir name={item.dir} contents={item.contents} key={item.dir}/>
    )}
  </ul>

export default FileTree
