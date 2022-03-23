import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function Header(props){ 
  return <header> 
      <h1><a href="/"  onClick={function(event){
        event.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
}
function Nav(props){
  const lis = [
  ]
  for(let i = 0; i<props.topics.length; i++){
    let t = props.topics[i]
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={function(event){
                                        // onClick={(event)=>{블라블라~~}} 로 축약가능(에로우펑션)
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
        console.log(event.target)
      }}>{t.title}</a>
    </li>)
  }

  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}
function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function App() {
  // const _mode = useState('Welcome');
  // const mode = _mode[1];
  // const setMode = _mode[1];

  const [mode, setMode] = useState('Welcome');
  const [id, setId] = useState(null);
  // 축약 

  console.log(mode)

  const topics = [
    {id: 1, title: 'html', body: 'html is ...'},
    {id: 2, title: 'Csss', body: 'Csss is ...'},
    {id: 3, title: 'Javascript', body: 'javascript is ...'}
  ]

  let content =null;
  if(mode=== 'Welcome') {
    content =  <Article  title="welcome" body="hello, Web"></Article>
  }else if (mode === 'Read'){

    let title, body = null;
    for(let i=0; i<topics.length; i++){
      console.log(topics[i].id, id)
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article  title={title} body={body}></Article>
  }

  return (
    <div>
      <Header title="sample" onChangeMode={function(){
        // mode = 'Welcome'
        setMode('Welcome')
      }}></Header>
      <Nav topics={topics} onChangeMode={function(_id){
        // mode = "Read"
        setMode('Read')
        setId(_id)
      }}> </Nav>
      {content}
    </div>
  );
}

export default App;
