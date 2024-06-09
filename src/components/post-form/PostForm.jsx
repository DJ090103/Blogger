import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Rte, Select } from "../index";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userdata = useSelector((state) => {
    // console.log(state);
    // console.log(state.auth);
    // console.log(state.auth.userData);
    // console.log(state.auth.userData.userData);
    return state.auth.userData;
  });

  console.log(userdata);

  const submit = async (data) => {
    console.log(data);
    if (post) {
      const file = data.image[0] ? service.uploadFile(data.image[0]) : null;

      if (file) {
        service.deleleFile(post.featuredImage);
      }

      const dpPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dpPost) {
        navigate(`/post/${dpPost.$id}`);
      }
    } else {
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        console.log(userdata);
        const temp_data = { ...data };
        console.log(temp_data);
        const dbPost = await service.createPost({
          ...data,
          userId: userdata.$id,
        });
        console.log(userdata);

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value.trim().toLowerCase().replace(/ /g, "-");
    // .replace(/\s/g, "-");

    return "";
  }, []);
  // let count = 0;
  // let transform_value = "";
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name == "title") {
        setValue(
          "slug",

          slugTransform(value.title, {
            shouldValidate: true,
          })
          // console.log(transform_value)
        );
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title "
          className="mb-4"
          {...register("title", {
            required: true,
          })}
        />
        <Input
          label="Slug :"
          placeholder="slug "
          className="mb-4"
          {...register("slug", {
            required: true,
          })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <Rte
          name="content"
          control={control}
          label="content"
          defaultValue={getValues("content")}
        />
      </div>

      <div className="w-1/3 px-2">
        <Input
          label="Featurred Image: "
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", {
            required: !post,
          })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="status"
          className="mb-4"
          {...register("status", {
            required: true,
          })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
          children={post ? "Update" : "submit"}
        />
      </div>
    </form>
  );
}

export default PostForm;
