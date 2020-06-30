import profileReducer, {addPostCreateAction, deletePostAC} from "./profileReducer";

let state = {
    posts: [
        {id: 1, message: 'Where is my car, dune?!', likesCount: 13},
        {id: 2, message: 'Here is it', likesCount: 69},
        {id: 3, message: 'Fuck!!!', likesCount: 77}
    ],
};

test('Add posts test', () => {
    let action = addPostCreateAction('fuck off!!!');
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(4);
});

test('Delete posts test', () => {
    let action = deletePostAC(2);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(2);
});

test('ID test', () => {
    let action = deletePostAC(1000);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(3);
});

test('Add posts test', () => {
    let action = addPostCreateAction('fuck off!!!');
    let newState = profileReducer(state, action);
    expect(newState.posts[3].message).toBe('хуй там тест пройдеш');
});