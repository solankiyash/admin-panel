import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  projects: [],
  isLoading: false,
  error: null,
};

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const {data} = await axios.get('/api/projects');
  console.log(data,"jjshdsdasdj");
  return data.projects[0].projects;
});

export const deleteProject = createAsyncThunk('projects/deleteProject', async (id, thunkAPI) => {
  const response = await axios.delete(`/api/projects/${id}`);
  return id; 
});

export const updateProject = createAsyncThunk('projects/updateProject', async (project, thunkAPI) => {
  try {
    const response = await axios.patch(`/api/projects/${project.id}`, project);
    console.log(response,"dsahd")
    
    return response.data;
  } catch (error) {
    console.error('Update failed:', error);
    return thunkAPI.rejectWithValue(error.response?.data || { error: 'Update failed' });
  }
});

export const addProject = createAsyncThunk('projects/addProject', async (project, thunkAPI) => {
  try {
    const response = await axios.post('/api/projects', project);
    return response.data.project; // Ensure this returns the added project
  } catch (error) {
    console.error('Add failed:', error);
    return thunkAPI.rejectWithValue(error.response?.data || { error: 'Add failed' });
  }
});

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject(state,action){
      state.projects = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchProjects.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchProjects.fulfilled, (state, action) => {
      state.isLoading = false;
      state.projects = action.payload;
    })
    .addCase(deleteProject.pending, (state) => {
      state.isLoading = true;  
      state.error = null;      
    })
    .addCase(deleteProject.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(state.projects); 
      state.projects = state.projects.filter((project) => project.id !== action.payload);
    })
    .addCase(deleteProject.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;  
    })

    // .addCase(updateProject.pending, (state) => {
    //   state.isLoading = true;
    //   state.error = null;
    // })
    .addCase(updateProject.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedData = action.payload.project;
      const obj = {
        id: updatedData.id,
        title: updatedData.title,
        description: updatedData.desc,
        quantity: updatedData.qty || 1,
        unit: parseFloat(updatedData.unit) || 0,
        price: parseFloat(updatedData.price) || 0,
      };
      // Replace the updated project in the state
      state.projects = state.projects.map(project =>
        project.id === updatedData?.id ?obj : project
      );
    })
    .addCase(updateProject.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(addProject.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(addProject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.projects.push(action.payload); // Add new project to the list
    })
    .addCase(addProject.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
},
});
export const {} = projectSlice.actions
export default projectSlice.reducer;
