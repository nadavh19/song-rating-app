               ┌──────────────────────────┐
               │  step = 0                │
               │  <UserForm />            │
               │  User enters name, album│
               └──────────┬───────────────┘
                          │ onSubmit
                          ▼
               ┌──────────────────────────┐
               │  step = 1                │
               │  <SongRatingScreen />    │
               │  User rates the songs   │
               └──────────┬───────────────┘
                          │ onFinish
                          ▼
               ┌──────────────────────────┐
               │  step = 2                │
               │  <AddAnotherUserScreen/> │
               │  Add another user?      │
               └──────┬─────────┬────────┘
                      │         │
     onAddAnother     │         │ onFinishGroup
                      ▼         ▼
         ┌────────────────┐    ┌──────────────────────────┐            
         │ step = 0       │    │  step = 3                │
         │ Back to Form   │    │  <GroupResultsSummry />  │ --------> step = 4, <SongComparsionTable /> , show song comparsion stats
         └────────────────┘    │  Show comparison stats   │
                               └──────────────────────────┘
