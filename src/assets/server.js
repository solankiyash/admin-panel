import { createServer, Model } from 'miragejs';
import { faker } from '@faker-js/faker';
import mockdata from "../../src/assets/components/api/project.json"

const DEFAULT_CONFIG = {
  environment: 'development',
  namespace: 'api',
};

export const makeServer = ({ environment, namespace } = DEFAULT_CONFIG) => {
  return createServer({
    environment,

    namespace,

    models: {
      project: Model,
    },

    seeds(server) {
      server.create('project', mockdata);
      
    },

    //   for (let index = 1; index <= LIST_LENGTH; index++) {
    //     server.create('project', {
    //       name: faker.person.fullName(),  // Use faker.person instead of faker.name
    //       number: faker.phone.number(),
    //     });
    //   }
    // },

    routes() {
      this.get('/projects', (schema) => {
        return schema.projects.all();
      });

      this.get('/projects/:id', (schema, request) => {
        const id = request.params.id;
        return schema.projects.find(id);
      });

      this.post('/projects', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.projects.create(attrs);
      });

    
  this.namespace = 'api';

  this.patch('/projects/:id', (schema, request) => {
    const id = request.params.id;
    const newAttrs = JSON.parse(request.requestBody);
    const project = schema.projects.find(id);

    if (project) {
      project.update(newAttrs);
      return project; // Return only the updated project
    } else {
      return new Response(404, {}, { error: 'Project not found' });
    }
  });

      this.delete('/projects/:id', (schema, request) => {
        const id = request.params.id;
        console.log(schema.projects.all()); // Log all projects for debugging
        const project = schema.projects.find(id);
      
        if (project) {
          return project.destroy();
        } else {
          return new Response(
            404, 
            { some: 'header' }, 
            { message: `Project with ID ${id} not found.` }
          );
        }
      });
      
    },
  });
};
