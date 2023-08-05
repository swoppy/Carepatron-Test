import { ArrowBack, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
  Step,
  StepLabel,
  Stepper,
  TextField
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form"
import React, { useContext, useState } from "react";
import { createClient } from "../../services/api";
import { StateContext } from "../../store/DataProvider";

type CreateClientFields = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}

export default function CreateNewClientButton() {
  const [open, setOpen] = useState(false); 

  const steps = ["Personal details", 'Contact details'];
  const [activeStep, setActiveStep] = useState(0);

  const { dispatch } = useContext(StateContext)

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    reset,
    formState: { errors, isValid },
  } = useForm<CreateClientFields>()

  const watchFirstName = watch('firstName');
  const watchLastName = watch('lastName');

  function resetForm() {
    reset({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
    });
    setActiveStep(0);
  }

  const handleCreateClient: SubmitHandler<CreateClientFields> = async (data) => {
    if (isValid) {
      createClient({ id: 'xxx-xasd', ...data })
      dispatch({ type: 'ATTEMPT_OPTIMISCTIC_CLIENT', data: { id: 'xxx-xasd', ...data } })
      resetForm();
      setOpen(false);
    }
  }

  function handleNext() {
    trigger(['firstName', 'lastName']);
    if (watchFirstName && watchLastName) {
      setActiveStep((prev) => prev + 1);
    }
  }

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{
          backgroundColor: "#335FFF",
          fontSize: "0.75rem",
          lineHeight: "1.25rem",
          padding: "12px 24px",
          textTransform: "unset",
          borderRadius: "0.375rem",
          fontWeight: 600,
          boxShadow: 'none',
        }}
      >
        Create new client
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        hideBackdrop
        fullWidth
        maxWidth="xs"
        sx={{
          '& .MuiPaper-root': {
            boxShadow: '1px 7px 44px 11px rgba(217,217,217,0.79)',
          }
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <DialogTitle padding={0} sx={{ fontSize: "1rem" }}>Create new client</DialogTitle>
          <IconButton
            aria-label="close new client"
            onClick={() => setOpen(false)}
          >
            <Close />
          </IconButton>
        </Box>
          
        <DialogContent>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  StepIconProps={{ classes: {
                    active: 'green'
                  } }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))} 
          </Stepper>
          <form onSubmit={handleSubmit(handleCreateClient)}>
            {activeStep === 0 && (
              <>
                <Box>
                  <Box>
                    <InputLabel shrink htmlFor="first-name">
                      First name
                    </InputLabel>
                    <TextField
                      id="first-name"
                      sx={{ width: '100%' }}
                      defaultValue=""
                      {...register('firstName', { required: true })}
                    />
                    {errors.firstName?.type === "required" && (
                      <p role="alert">First name required</p>
                    )}
                  </Box>
                  <Box>
                    <InputLabel shrink htmlFor="last-name">
                      Last name
                    </InputLabel>
                    <TextField
                      id="last-name"
                      sx={{ width: '100%' }}
                      defaultValue=""
                      {...register('lastName', { required: true })}
                    />
                    {errors.lastName?.type === "required" && (
                      <p role="alert">Last name required</p>
                    )}
                  </Box>
                </Box>
                <Box display="flex" justifyContent="end">
                  <Button
                    variant="contained"
                    onClick={handleNext}
                  >
                    Continue
                  </Button>
                </Box>
              </>
            )}
            {activeStep === 1 && (
              <>
                <Box>
                  <Box>
                    <InputLabel shrink htmlFor="email">
                      Email
                    </InputLabel>
                    <TextField
                      id="email"
                      sx={{ width: '100%' }}
                      defaultValue=""
                      {...register('email', { required: true })}
                    />
                  </Box>
                  <InputLabel shrink htmlFor="phone-number">
                    Phone number
                  </InputLabel>
                  <TextField
                    id="phone-number"
                    sx={{ width: '100%' }}
                    type="number"
                    defaultValue=""
                    {...register('phoneNumber', { required: true })}
                  />
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <div>
                    <IconButton size="small" onClick={() => setActiveStep(0)}>
                      <ArrowBack />
                    </IconButton>
                    Back
                  </div>
                  <Button
                    variant="contained"
                    type="submit"
                  >
                    Create client
                  </Button>
                </Box>
              </>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
