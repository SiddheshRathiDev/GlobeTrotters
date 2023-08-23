

import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';

//redux
import { useDispatch, useSelector } from 'react-redux';

import { styled, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, TextField, Box } from '@mui/material';

import { IconButton, Avatar, Typography } from '@mui/material';
import Button from '@mui/material/Button';

import FavoriteIcon from '@mui/icons-material/Favorite';

import { blueGrey, red } from '@mui/material/colors';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';


import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

import { useNavigate } from 'react-router-dom';

import { Menu, MenuItem } from '@mui/material';


//utils
import { createUrl } from '../utils/utils';


//value returning functions import  
import GetPostLikes from '../services/getPostLikes';
import { useEffect } from 'react';
import { create } from '@mui/material/styles/createTransitions';




const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Post(postId) {
    const [expanded, setExpanded] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [colorLike, setColorLike] = useState("");
    const [numberOfLikes, setNumberOfLikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [numberOfComments, setNumberOfComments] = useState(0);
    const [postComment, setPostComment] = useState("");
    const userId = useSelector((state) => state.auth.userId);
    
    const [ifLiked, setIfLiked] = useState(0);
    

    
    var navigate = useNavigate();
    useEffect(() => {


        //var paths = "/api/PostLikes/GetData?userId=40&postId=2";
        const path = createUrl("/api/PostLikes/GetData?userId=" + userId + "&postId=" + postId);

        axios.get(path)
            .then((response) => {
                setIfLiked(response.data);
                console.log("after liked "+ response.data);
                if (ifLiked == 1) {
                    setColorLike("red");
                }
                else{
                    setColorLike("");
                }


            })
            .catch((error) => {
                console.log(error);
            })

        //var pathComment = "/api/PostComments/1";
        const pathComment = createUrl("/api/PostComments/" + postId);
        axios.get(pathComment)
            .then((response) => {

                setComments(response.data);
                console.log(comments);


            })
            .catch((error) => {
                console.log(error);
            })

        //get comment count
        const pathNumberofComments = createUrl("/getCommentCount" + postId);
        axios.get(pathNumberofComments)
            .then((response) => {

                setNumberOfComments(response.data);
                console.log(numberOfComments);

            })
            .catch((error) => {
                console.log(error);
            })





    }, [colorLike, postComment, numberOfComments])



    var handleLike = () => {
        // if (colorLike == "") {
        //     setColorLike("red");

        // }
        // else {
        //     setColorLike("");
        // }
        if (ifLiked == 1) {
            console.log("in if ")
            const path = createUrl("/api/PostLikes/deleteLike?userId=" + userId + "&postId=" + postId);
            axios.delete(path)
                .then((response) => {
                    
                    setColorLike("")
                })
                .catch((error) => {
                    console.log(error)
                });
        }
        else {
            
            console.log("in else")
            console.log(userId + " " + postId);

            const paths = "api/PostLikes/insertLike?userId=4&postId=4";
            const path = createUrl("/api/PostLikes/insertLike?userId=" + userId + "&postId=" + postId);
            axios.post(path)
                .then((response) => {
                    setColorLike("red")
                })
                .catch((error) => {
                    console.log(error)
                });
        }


    }




    var handleSearch = () => {
        //navigate('www.google.com');
    }


    //for comments
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    //for vetical icon
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const goToProfile = () => {
        navigate('/otherprofile');
    };

    const getLikes = async () => {
      

        const path = createUrl("/api/posts/" + postId);
        try {
            const response = await axios.get(path);
            setNumberOfLikes(response.data);


        } catch (ex) {


        }
    }

    const postCommentToServer = () => {

       
            const path = createUrl("/api/PostComments");
            axios.post(path, {
                "postId": postId,
                "userId": userId,
                "commentContent": postComment
            })
                .then((response) => {
                    setPostComment("");
                })
                .catch((error) => {
                    console.log(error)
                });



    }




    return (
        <>

            <div id="card" style={{ display: 'flex', justifyContent: 'center' }} >
                <div id="inCard"  >

                    <br />
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', maxWidth: 500 }}
                    >

                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search around the Globe"
                            inputProps={{ 'aria-label': 'Search around the Globe' }}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch} >
                            <SearchIcon />
                        </IconButton>

                    </Paper>

                    <br /><br />
                   



                    <Card sx={{ maxWidth: 500 }} >
                        <CardHeader
                            avatar={
                                <Avatar onClick={goToProfile} sx={{ bgcolor: blueGrey[500] }} aria-label="profile photo" src="http://localhost:3000/images/batman.jpg">

                                </Avatar>
                            }
                            action={
                                <div>
                                    <IconButton
                                        aria-controls="menu"
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        id="menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose}>Unfollow</MenuItem>
                                        <MenuItem onClick={handleClose}>Report </MenuItem>

                                    </Menu>

                                </div>
                            }
                            title="Abhijeet Shinde"
                            subheader="Himalaya, India"
                        />
                        <CardMedia
                            component="img"
                            height="300"
                            image="http://localhost:3000/images/himalaya.jpg"
                            alt="image"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Heaven on Earth!!
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon onClick={handleLike} style={{ color: colorLike }} />
                                <Typography fontSize={16}>{numberOfLikes} Likes</Typography>
                                < div onLoad={getLikes()}></div> 
                            </IconButton>


                            <CommentIcon
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >

                            </CommentIcon>
                            <Typography fontSize={16}>{numberOfComments} Comments</Typography>


                        </CardActions >
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <center>
                                <Box
                                    sx={{
                                        width: 500,
                                        maxWidth: '93%',

                                    }}
                                >
                                    <TextField fullWidth label="Comment" id="commentBox" value={postComment} onChange={(args) => setPostComment(args.target.value)} >
                                    </TextField>
                                    <Box display="flex" justifyContent="flex-start">
                                        <Button variant="contained" color="primary"  sx={{
                                            width:'10%',
                                            height:'20px',
                                            mt:'8px'
    
                                        }} onClick={postCommentToServer}>Post</Button>
                                    </Box>

                                </Box>

                            </center>
                            <br />
                            <Box component="span" sx={{ display: 'block', marginLeft: `20px`, marginRight: `20px` }}>


                                <Typography>
                                    {comments.map(comment => {
                                        return (
                                            <>
                                                <Typography variant="body3"><strong>{comment.userName}</strong> {comment.commentContent} </Typography>
                                                <br />
                                            </>
                                        )

                                    })}
                                </Typography>
                            </Box>




                            <CardContent>
                            </CardContent>
                        </Collapse>
                    </Card>
                </div>

            </div>




        </>
    );
}