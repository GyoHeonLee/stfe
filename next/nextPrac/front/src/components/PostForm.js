import { Form, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useState, useRef } from "react";
import { addpost } from "../reducers/post";

const PostForm = () => {
  const dispatch = useDispatch();
  const { imagePaths } = useSelector((state) => state.post);
  const imageInput = useRef();
  const [text, setText] = useState("");
  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    dispatch(addpost);
    setText("");
  }, []);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <Form
      style={{ margin: "10px 0 20px" }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map((imagePath) => (
          <div key={imagePath} style={{ display: "inline-block" }}>
            <img src={imagePath} style={{ width: "200px" }} alt={imagePath} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
