import React from 'react'
import {Field, Form, Formik} from 'formik'
import {FilterType} from "../../redux/usersReducer";
import {useSelector} from "react-redux";
import {getFilter} from "../../redux/usersSelector";

type FriendFormType = 'null' | 'true' | 'false'
type FormType = {
    term: string,
    friend: FriendFormType
}
type UsersSearchPropsType = {
    onChangedFilter: (filter: FilterType) => void
}

const UsersSearchForm: React.FC<UsersSearchPropsType> = (props) => {

    const filter = useSelector(getFilter)

    const submitHandler = (values: FormType, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
        const filter = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
        props.onChangedFilter(filter)
        setSubmitting(false)
    }
    return <Formik
        enableReinitialize
        initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
        onSubmit={submitHandler}
    >
        {({isSubmitting}) => (
            <Form>
                <Field type="text" name="term"/>
                <Field name="friend" as="select">
                    <option value="null">All</option>
                    <option value="true">Followed</option>
                    <option value="false">Unfollowed</option>
                </Field>
                <button type="submit" disabled={isSubmitting}>
                    Search
                </button>
            </Form>
        )}
    </Formik>
}

export default UsersSearchForm