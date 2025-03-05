import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  /** Generic request function to interact with API. */
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. (This one was given to us)*/

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // obviously, you'll add a lot here ... (this is where we added our own)
  //Get all companies, can filter by by name
  static async getCompanies(name) {
    let res = await this.request("companies", { name }); //This is done instead of the `companies/${name}. it is { params }`
    return res.companies;
  }

  //Get list of jobs, can filter by title
  static async getJobs(title) {
    let res = await this.request("jobs", { title });
    return res.jobs;
  }
  //Get details on job based on ID
  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }
  //Apply to job (post) based on jobId and username
  static async applyToJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return res.applied;
  }

  //Register a new user (post)
  static async register(userData) {
    let res = await this.request("auth/register", userData, "post");
    return res.token;
  }

  //Login an existing user (post)
  static async login(credentials) {
    let res = await this.request("auth/token", credentials, "post");
    return res.token;
  }

  //Get a users details
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }
  //Update user details (patch)
  static async updateUser(username, data) {
    console.log("Updating user:", username); // Debugging log to verify username
    let res = await this.request(`users/${username}`, data, "patch"); // Ensure username is passed in URL
    return res.user;
  }
}

// for now, put token ("testuser" / "password" on class) REPLACE AFTER AUTH IS BUILT
// JoblyApi.token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
