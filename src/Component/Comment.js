import React,{Component} from 'react';
import $ from 'jquery';
import  '../stylesheet/Post.css'
class Add extends Component
{
	constructor(props)
	{
		super(props);
		this.state=
		{
			file:{},
			caption:''
		}
	}
	handleCaptions=(caption)=>
	{
		this.setState({caption:caption.target.value});
	}
	handleFile(file)
	{
  		this.setState({file:file.target})
	}
	submitted(e)
	{
		e.preventDefault();
		const formData = new FormData()
  		formData.append('imgUploader',this.state.file.files[0])
		fetch('http://localhost:3000/upload',{
	      method:'POST',
	      body:formData,
	      headers:{user:this.props.fun.state.user.id,caption:this.state.caption}
	    })
	    .then(res=>res.json())
	    .then(r=>
	    	{
	    		console.log(r.path)
	    		this.props.fun.feeds();
	    	})
	}
  render()
  {
  
    return(
     <div className="Add" id={this.props.uid}>
     <form className="form" id="form" onSubmit={e=>this.submitted(e)}>
     	<input type="text" className="input-caption" onChange={e=>this.handleCaptions(e)} placeholder="Enter about your post"/>
     	<input type="file" className="input-file" accept="image/*" name="myFile" single="true" onChange={(e)=>this.handleFile(e)}/>
     	<input type="submit"/>
     </form>
     </div>
    )
  }
}

export default Add;

