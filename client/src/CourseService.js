const url = "http://localhost:5000/api/courses";

class CourseService {
  // Get Courses

  static getCourses() {
    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }

    return new Promise((resolve, reject) => {
      fetch(url)
        .then(handleErrors)
        .then((response) => response.json())
        .then((data) => {
          resolve(
            data.map((course) => ({
              ...course,
              createdAt: new Date(course.createdAt),
            }))
          );
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }
  // Create Course

  static insertCourse(topic, location, price) {
    const data = { topic, location, price };
    const res = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());

    return res;
  }
  // Delete Course

  static deleteCourse(id) {
    return fetch(`${url}/${id}`, {
      method: "DELETE",
    });
  }
}

export default CourseService;
