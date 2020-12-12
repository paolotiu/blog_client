import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { IBlog, IUser } from '../../types';
import { updateBlog } from '../../functions/api';
import { Spinner } from '../Spinner/Spinner';
interface Props {
    user: IUser;
    blogs: IBlog[] | null | undefined;
}

export const EditBlog: React.FC<Props> = ({ user, blogs }) => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const [isAuthor, setIsAuthor] = useState(true);
    const [blog, setBlog] = useState<IBlog>();
    const [saving, setSaving] = useState(false);
    useEffect(() => {
        console.log('HEY');
        if (blogs) {
            const blog = blogs.find((blog) => {
                if (blog._id === id) {
                    return true;
                } else {
                    return false;
                }
            });

            // Check if author and user are the same
            console.log(blog);
            if (blog?.author.username === user.username) {
                setBlog(blog);
                setText(blog.text);
                setTitle(blog.title);
                return;
            } else {
                console.log('jjj');
                setIsAuthor(false);
            }
        } else {
            setIsAuthor(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    return (
        <>
            {isAuthor ? (
                <>
                    <form action="" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={handleChange}
                        />
                        <Editor
                            apiKey="1eyhnd1ai3lt42bnqpcwia7y7lnlygy2395s0azirzbom22o"
                            initialValue={text}
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image',
                                    'charmap print preview anchor help',
                                    'searchreplace visualblocks code',
                                    'insertdatetime media table paste wordcount',
                                ],
                                toolbar: `undo redo | formatselect | bold italic | \
                                        alignleft aligncenter alignright | \
                                        bullist numlist outdent indent | help`,
                            }}
                            outputFormat="text"
                            onChange={handleChange}
                        />
                        <button type="submit">Save</button>
                    </form>
                    <Spinner
                        message="Saving..."
                        isModal={true}
                        marginTop="300px"
                        isOpen={saving}
                    />
                </>
            ) : (
                <Redirect to="/myblogs" />
            )}
        </>
    );

    function handleChange(e: any) {
        if (e.target.name === 'title') {
            setTitle(e.target.value);
        } else {
            setText(e.target.getContent());
        }
    }

    function handleSubmit(e: React.MouseEvent<HTMLFormElement, MouseEvent>) {
        e.preventDefault();
        setSaving(true);
        updateBlog(id, title, text).then((res) => {
            history.push('/blogs/' + id);
            setSaving(false);
        });
    }
};
